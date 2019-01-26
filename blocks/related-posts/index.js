/**
 * registerBlockType and source code.
 */
import icon from './icon';
import './style.scss';
import edit from './edit';

const {__} = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
export default registerBlockType(
    'as-related-posts-block/related-posts',
    {
        title      : __('Related Posts'),
        description: __('Display list of Related Posts by tag.'),
        category   : 'common',
        icon       : {
            background: '#f0f0f0',
            foreground: '#1163EB',
            src       : icon
        },
        keywords   : [
            __('related'),
            __('posts'),
            __('random'),
        ],
        supports: {
            html: false,
        },
        edit,
        save() {
            // Rendering in PHP
            return null;
        },
    },
);