/**
 * registerBlockType and source code.
 */
import icon from './icon';
import './style.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Spinner } = wp.components;
const { withSelect } = wp.data;

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
        edit: withSelect( select => {
            // get current edited post id
            const post_id = select("core/editor").getCurrentPostId();
            // get entry records
            const { getEntityRecords } = select( 'core' );
            // query parameters for list posts
            const relatedPostsQuery = pickBy( {
                // categories: '29',
                tags: '204',
                exclude: post_id,
                order: 'desc',
                orderby: 'date',
                per_page: 5,
            }, ( value ) => ! isUndefined( value ) );
            return {
                relatedPosts: getEntityRecords( 'postType', 'post', relatedPostsQuery ),
            };
        } )( ( { relatedPosts, className } ) => {

            console.log( 'posts response', relatedPosts );

            if ( ! relatedPosts ) {
                return (
                    <p className={className} >
                        <Spinner />
                        { __( 'Loading Related Posts' ) }
                    </p>
                );
            }

            if ( 0 === relatedPosts.length ) {
                return <p>{ __( 'No Related Posts' ) }</p>;
            }

            return (
                <div className="related-posts">
                    <h3>Related Posts:</h3>
                    <ul className={ className }>
                        { relatedPosts.map( post => {
                            return (
                                <li>
                                    <a className={ className } href={ post.link }>
                                        { post.title.rendered }
                                    </a>
                                </li>
                            );
                        }) }
                    </ul>
                </div>
            );
        } ) // end withAPIData
        , // end edit
        save() {
            // Rendering in PHP
            return null;
        },
    },
);