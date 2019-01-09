/**
 * registerBlockType and source code.
 */
import icon from './icon';
import './style.scss';
import edit from './edit';
/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Spinner, PanelBody, RangeControl, SelectControl } = wp.components;
const { withSelect } = wp.data;
const { InspectorControls } = wp.editor;

import { isUndefined, pickBy } from 'lodash';

/**
 * Register block
 */
export default registerBlockType(
    'as-related-posts-block/related-posts',
    {
        title: __( 'Related Posts' ),
        description: __( 'Display list of Related Posts by tag.' ),
        category: 'common',
        icon: {
            background: '#f0f0f0',
            src: icon
        },
        keywords: [
            __( 'related' ),
            __( 'posts' ),
            __( 'random' ),
        ],
        attributes: {
            relatedTag: {
                type: 'string',
            },
            numberPosts: {
                type: "number",
                default: "5"
            },
        },
        edit,
        save() {
            // Rendering in PHP
            return null;
        },
    },
);