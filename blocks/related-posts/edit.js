import { Component, Fragment } from '@wordpress/element';

class RelatedPostsEdit extends Component {

    render() {
        return (
            <div>hello</div>
        )
    }
}

export default RelatedPostsEdit;
export default func_name( ( select ) => {} )( LatestPostsEdit );

// : withSelect( select => {
//     // get current edited post id
//     const post_id = select("core/editor").getCurrentPostId();
//     // get entry records
//     const { getEntityRecords } = select( 'core' );
//     // query parameters for list posts
//     const relatedPostsQuery = pickBy( {
//         // categories: '29',
//         tags: '204',
//         exclude: post_id,
//         order: 'asc',
//         orderby: 'date',
//         per_page: 5,
//     }, ( value ) => ! isUndefined( value ) );
//     return {
//         relatedPosts: getEntityRecords( 'postType', 'post', relatedPostsQuery ),
//     };
// } )( ( { relatedPosts, className } ) => {
//
//     console.log( 'posts response', relatedPosts );
//
//     if ( ! relatedPosts ) {
//         return (
//             <p className={className} >
//                 <Spinner />
//                 { __( 'Loading Related Posts' ) }
//             </p>
//         );
//     }
//
//     if ( 0 === relatedPosts.length ) {
//         return <p>{ __( 'No Related Posts' ) }</p>;
//     }
//
//     return (
//         <div className="related-posts">
//             {/* block controls */}
//             <InspectorControls>
//                 <PanelBody title={__('Block Settings')}>
//                     <SelectControl
//                         label="Select Tag"
//                         value="tag-2"
//                         options={[
//                             {label: 'tag 1', value: 'tag-1'},
//                             {label: 'tag 2', value: 'tag-2'},
//                             {label: 'tag 3', value: 'tag-3'},
//                         ]}
//                         onChange={ (related_tag) => {
//                             console.log( related_tag );
//                         }}
//                     />
//                     <RangeControl
//                         label="Number of Posts"
//                         value={5}
//                         min={1}
//                         max={10}
//                         onChange={ (num_posts) => {
//                             console.log( num_posts );
//                         }}
//                     />
//                 </PanelBody>
//             </InspectorControls>
//             {/* end block controls */}
//
//             <h3>Related Posts:</h3>
//             <ul className={ className }>
//                 { relatedPosts.map( post => {
//                     return (
//                         <li>
//                             <a className={ className } href={ post.link }>
//                                 { post.title.rendered }
//                             </a>
//                         </li>
//                     );
//                 }) }
//             </ul>
//         </div>
//     );
// } ) // end withAPIData
//     , // end edit