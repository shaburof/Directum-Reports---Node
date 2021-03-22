import { FotoModel } from '../../model/mysql/fotoModel';
import {  } from '../../server';
import dotenv from 'dotenv';
dotenv.config();

const cache = {};
class Foto {
    private static localFotoPath = process.env.FOTO_PATH_LOCAL;
    private static fotoFioExceptions = {
        'Сотрудник ОПЕРУ': Foto.localFotoPath + '/sotrudnik_opery.jpg',
        'Сотрудник МИДЛ': Foto.localFotoPath + 'sotrudnik_midl.jpg',
        'Сотрудник HelpDesk': Foto.localFotoPath + 'sotrudnik_hd.jpg',
        'Поручения': Foto.localFotoPath + 'sotrudnik_porucheniya.jpg',
    };

    public static async getFoto(fio: string) {
        if (!fio) return '';
        if (Foto.fotoFioExceptions[fio]) return Foto.fotoFioExceptions[fio];

        let ename: string;
        if (!cache[fio]) {
            let result = await Foto.getFotoPath(fio);
            ename = result ? result.ename : '';
            if (ename !== '') cache[fio] = result.ename;
        } else ename = cache[fio];

        let path = process.env.FOTO_PATH;
        return path + ename + '.jpg';
    }

    public static async isRemoteFotoAvaliable() {
        try {
            let fotoModel = new FotoModel();
            let response = await fotoModel.status();
            if (response && (response as any).length>0) return true;
            return false;
        } catch (error) {
            console.log('error: ', error.message);
            return false;
        }
    }

    private static async getFotoPath(fio: string) {
        try {
            let fotoModel = new FotoModel();
            let result = await fotoModel.findByFio(fio);

            return result;
        } catch (error) {
            console.log('192.168.2.66 база log3 недоступна');
            console.log(error.message);
            return { ename: '' };
        }
    }

}

export { Foto };