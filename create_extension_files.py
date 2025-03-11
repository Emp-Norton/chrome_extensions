import argparse, json, os


def create_extension_skeleton(extension_name):
    os.mkdir(extension_name)

    manifest_file = os.path.join(extension_name, 'manifest.json')
    with open(manifest_file, 'w') as f:
        manifest_data = {
            'manifest_version': 3,
            'name': extension_name,
            'version': '1.0',
            'description': '',
            'background': {
                'service': 'background.js'
            },
            'content_scripts': [
                {
                    'matches': ['<all_urls>'],
                    'js': ['content.js']
                }
            ],
            'action': {
                'default_popup': 'popup.html',
                'default_icon': {
                    '16': 'icons/icon16.png',
                    '48': 'icons/icon48.png',
                    '128': 'icons/icon128.png'
                }
            },
            'icons': {
                '16': 'icons/icon16.png',
                '48': 'icons/icon48.png',
                '128': 'icons/icon128.png'
            }
        }
        json.dump(manifest_data, f, indent=4)

    background_dir = os.path.join(extension_name, 'background')
    os.mkdir(background_dir)
    background_file = os.path.join(background_dir, 'background.js')
    with open(background_file, 'w') as f:
        f.write('// Background script\n')

    content_dir = os.path.join(extension_name, 'content')
    os.mkdir(content_dir)
    content_file = os.path.join(content_dir, 'content.js')
    with open(content_file, 'w') as f:
        f.write('// Content script\n')

    popup_dir = os.path.join(extension_name, 'popup')
    os.mkdir(popup_dir)
    popup_html_file = os.path.join(popup_dir, 'popup.html')
    with open(popup_html_file, 'w') as f:
        f.write('<!DOCTYPE html>\n<html>\n<head>\n<title>Popup</title>\n</head>\n<body>\n<!-- Popup content -->\n<script src="popup.js"></script>\n</body>\n</html>')
    popup_js_file = os.path.join(popup_dir, 'popup.js')
    with open(popup_js_file, 'w') as f:
        f.write('// Popup script\n')
    popup_css_file = os.path.join(popup_dir, 'popup.css')
    with open(popup_css_file, 'w') as f:
        f.write('/* Popup styles */\n')

    icons_dir = os.path.join(extension_name, 'icons')
    os.mkdir(icons_dir)

    readme_file = os.path.join(extension_name, 'README.md')
    with open(readme_file, 'w') as f:
        f.write('# ' + extension_name + '\n')

if __name__ == '__main__':
    extension_name = input('Enter the name of your extension: ')
    create_extension_skeleton(extension_name)