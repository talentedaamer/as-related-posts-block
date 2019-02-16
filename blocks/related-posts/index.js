/**
 * registerBlockType and source code.
 */
import icons from './icons';
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
        description: __('Display list of Related Posts by category.'),
        category   : 'common',
        icon       : {
            foreground: '#1163EB',
            src       : icons.icon
        },
        keywords   : [
            __('related'),
            __('posts'),
            __('category'),
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
