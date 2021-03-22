import { Request, Response, NextFunction } from 'express';
import { userRoleEnum, methodEnum } from '../types/enums';

const guardedUrls: { url: string, method: methodEnum, role?: userRoleEnum }[] = [
    { url: '/responsite', method: methodEnum.POST },
    { url: '/responsite', method: methodEnum.DELETE },
    { url: '/classifier', method: methodEnum.POST, role: userRoleEnum.POWERUSER },
    { url: '/classifier/*', method: methodEnum.PUT, role: userRoleEnum.POWERUSER },
    { url: '/classifier/*', method: methodEnum.DELETE, role: userRoleEnum.POWERUSER },
    { url: '/user/*', method: methodEnum.GET, role: userRoleEnum.ADMIN },
    { url: '/user', method: methodEnum.POST, role: userRoleEnum.ADMIN },
    { url: '/user/*', method: methodEnum.PUT, role: userRoleEnum.ADMIN },
    { url: '/user/*', method: methodEnum.DELETE, role: userRoleEnum.ADMIN },
    { url: '/logout', method: methodEnum.POST },
    { url: '/get', method: methodEnum.POST },
    // { url: '/test', method: methodEnum.GET },
];

const guardMiddleware = (req: Request, res: Response, next: NextFunction) => {

    let role = req.session!.login.role as userRoleEnum;
    let url = req.url;
    let method = req.method;
    let isLogin = req.session!.login.isLogin;

    for (const guardedUrl of guardedUrls) {
        if (method !== guardedUrl.method) continue;
        if (compareGuardUrlWithPLaceholders(guardedUrl.url, url)) {
            if (!isLogin) return next(getAuthError());
            if (!isEnoughPrivileges({ currentRole: role, guardedRole: guardedUrl.role })) return next(getGuardError());
        }
    }
    return next();
};

export { guardMiddleware };

function getAuthError() {
    return new Error('not authorized');
}

function getGuardError() {
    return new Error('guarded url');
}

function compareGuardUrlWithPLaceholders(pattern: string, url: string) {
    if (url === '/') return false;

    let splitedPattern = pattern.split('/').splice(1, pattern.length);
    let splitedUrl = url.split('/').splice(1, url.length);
    if (splitedPattern[splitedPattern.length - 1] === '') splitedPattern.splice(splitedPattern.length - 1, 1);
    if (splitedUrl[splitedUrl.length - 1] === '') splitedUrl.splice(splitedUrl.length - 1, 1);

    if (splitedPattern.length !== splitedUrl.length && !splitedPattern.includes('**')) return false;

    let urlPassed = true;
    let patternMaskAdded = false;
    for (let index = 0; index < splitedUrl.length; index++) {
        if (splitedPattern[index] === '*') continue;
        if (splitedPattern[index] === '**') patternMaskAdded = true;

        if (splitedUrl[index] !== splitedPattern[index] && !patternMaskAdded) {
            urlPassed = false;
            break;
        }
    }
    return urlPassed;
}

function isEnoughPrivileges({ currentRole, guardedRole }: { currentRole: userRoleEnum, guardedRole?: userRoleEnum }) {
    if (!guardedRole) return true;
    if (currentRole === userRoleEnum.ADMIN) return true;
    else if (currentRole === guardedRole) return true;
    else if (currentRole === userRoleEnum.POWERUSER && guardedRole === userRoleEnum.USER) return true;
    return false;
}