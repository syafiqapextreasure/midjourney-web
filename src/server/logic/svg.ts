import { exec } from 'child_process';
import { readFileSync } from 'fs';
import { OptionsType } from '../api/routers/d';

const FILE_PATH = 'img';

export const downloadAndConvert = async (url: string, options: OptionsType): Promise<string> => {
    const fileName = _getFileName(url);
    const cmd = `mkdir -p ${FILE_PATH} && cd img && { curl -O ${url}; cd ..; } &&` +
    ` ${process.env.VTRACER_DIR} ` +
        `--input ${FILE_PATH}/${fileName}.png ` +
        `--output ${FILE_PATH}/${fileName}.svg ` +
        `--colormode ${options.isBW ? 'bw' : 'color'} ` +
        `--color_precision ${options.colorPrecision} ` +
        `--corner_threshold ${options.cornerThreshold} ` +
        `--filter_speckle ${options.filterSpeckles} ` +
        `--gradient_step ${options.gradientSteps} ` +
        `--hierarchical ${options.isCutOut? 'cutout': 'stacked'} ` +
        `--mode ${options.curveFitting} ` +
        `--segment_length ${options.segmentLength} ` +
        `--splice_threshold ${options.spliceThreshold} `
    ;

    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve(readFileSync(`${FILE_PATH}/${fileName}.svg`, 'utf8'));
            }
        });
    });
}

const _getFileName = (url: string) => {
    return url.split('/').pop()?.split(".")[0];
}