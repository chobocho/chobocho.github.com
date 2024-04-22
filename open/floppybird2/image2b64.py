import base64
import os

def image2base64(img_file):
    with open(img_file, 'rb') as file:
        return base64.b64encode(file.read()).decode()


def main(filepath):
    filelist = next(os.walk(filepath))[2]

    image_file = {}
    for file in filelist:
        if '.png' in file or '.jpg' in file:
            # print(file, os.path.isfile(file))
            image_file[file] = image2base64(file)

    for k, v in image_file.items():
        idx = k.find('.')
        print(f'\nconst {k[:idx]}_img = "{v}";')


if __name__ == '__main__':
    main('.')
