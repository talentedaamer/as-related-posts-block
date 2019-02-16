// block icon
import icons from './icons';

const { __ } = wp.i18n;
const { withSelect } = wp.data;
const { Component, Fragment } = wp.element;
import isUndefined from 'lodash/isUndefined';
import pickBy from 'lodash/pickBy';
import { decodeEntities } from '@wordpress/html-entities';

const {
	Spinner,
	PanelBody,
	Placeholder,
	QueryControls,
	ToggleControl,
	RangeControl,
} = wp.components;

import { dateI18n, format, __experimentalGetSettings } from '@wordpress/date';

const {
	InspectorControls,
} = wp.editor;

// api fetch
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

class RelatedPostsEdit extends Component {

	constructor () {
		super( ...arguments );
		this.state = {
			categoriesList   : [],
			relatedCategories: [],
		};

		this.toggleDisplayPostDate = this.toggleDisplayPostDate.bind( this );
		this.toggleDisplayPostContent = this.toggleDisplayPostContent.bind( this );
	}

	toggleDisplayPostDate() {
		const { displayPostDate } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { displayPostDate: ! displayPostDate } );
	}

	toggleDisplayPostContent() {
		const { displayPostContent } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { displayPostContent: ! displayPostContent } );
	}

	getPostCategories ( relatedCategories ) {
		this.isStillMounted = true;
		const hasCategories = Array.isArray( relatedCategories ) && relatedCategories.length;
		if ( hasCategories ) {
			this.catRequest = apiFetch( {
				path: addQueryArgs( '/wp-json/wp/v2/categories', {
					per_page: - 1, // get all categories
					include : relatedCategories
				} ),
			} ).then( ( relatedCategories ) => {
				if ( this.isStillMounted ) {
					this.setState( { relatedCategories } );
				}
			} ).catch( err => {
				if ( this.isStillMounted ) {
					this.setState( { relatedCategories: [] } );
				}
			} );
		}
	}

	componentDidMount () {
		const { relatedCategories } = this.props;
		this.getPostCategories( relatedCategories );
	}

	componentWillReceiveProps ( newProps ) {
		if ( newProps.relatedCategories !== this.props.relatedCategories ) {
			const { relatedCategories } = newProps;
			this.getPostCategories( relatedCategories );
		}
	}

	componentWillUnmount () {
		this.isStillMounted = false;
	}

	render () {
		const { attributes, setAttributes, relatedPosts } = this.props;
		const { relatedCategories } = this.state;
		const { order, orderBy, categories, postsToShow, displayPostDate, displayPostContent, postContentLength } = attributes;

		// block inspector controls
		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __( 'Block Settings' ) }>
					<QueryControls
						{ ...{ order, orderBy } }
						onOrderChange={ ( value ) => setAttributes( { order: value } ) }
						onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
						categoriesList={ relatedCategories }
						selectedCategoryId={ categories }
						onCategoryChange={ ( category ) => setAttributes( { categories: '' !== category ? category : undefined } ) }
						numberOfItems={ postsToShow }
						onNumberOfItemsChange={ ( postsToShow ) => setAttributes( { postsToShow } ) }
					/>
					<ToggleControl
						label={ __( 'Display post date' ) }
						checked={ displayPostDate }
						onChange={ this.toggleDisplayPostDate }
					/>
					<ToggleControl
						label={ __( 'Display post content' ) }
						checked={ displayPostContent }
						onChange={ this.toggleDisplayPostContent }
					/>
					{ displayPostContent &&
					<RangeControl
						label="Content Length"
						value={ postContentLength }
						onChange={ ( value ) => setAttributes( { postContentLength: value } ) }
						min={ 10 }
						max={ 200 }
					/>
					}
				</PanelBody>
			</InspectorControls>
		);

		// check if has posts
		const hasPosts = Array.isArray( relatedPosts ) && relatedPosts.length;

		// if not has posts
		if ( ! hasPosts ) {
			return (
				<Fragment>
					{ inspectorControls }
					<Placeholder icon={ icons.iconSmall } label={ __( 'Related Posts' ) }>
						{ ! Array.isArray( relatedPosts ) ? <Spinner/> : __( 'No Related posts found.' ) }
					</Placeholder>
				</Fragment>
			);
		}

		const displayPosts = relatedPosts.length > postsToShow ? relatedPosts.slice( 0, postsToShow ) : relatedPosts;

		const dateFormat = __experimentalGetSettings().formats.date;

		return (
			<div className="asrpb-wrap">
				{ inspectorControls }
				<h3 className="asrpb-title">Related Posts:</h3>
				<ul className="asrpb-list">
					{ displayPosts.map( ( post, i ) => {
						const postContent = post.content.raw.replace(/<[^>]+>/g, '');
						return (
							<li className="asrpb-list-item" key={ i }>
								<a href={ post.link } target="_blank">
									{ decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)' ) }
								</a>
								{ displayPostDate && post.date_gmt &&
								<time dateTime={ format( 'c', post.date_gmt ) } className="wp-block-latest-posts__post-date">
									{ dateI18n( dateFormat, post.date_gmt ) }
								</time>
								}
								{ displayPostContent && postContent &&
								<p>{ postContent.substring( 0, postContentLength ) } [...]</p>
								}
							</li>
						);
					} ) }
				</ul>
			</div>
		);
	}
}

export default withSelect( ( select, props ) => {

	// get block attributes
	const { postsToShow, order, orderBy, categories } = props.attributes;
	// get entity records function
	const { getEntityRecords } = select( 'core' );
	// get current post being edited or created
	const currentPost = select( 'core/editor' ).getCurrentPost();
	const postCategories = select( 'core/editor' ).getEditedPostAttribute('categories');

	// post query.
	const relatedPostsQuery = pickBy( {
		categories: categories,
		order,
		orderby   : orderBy,
		per_page  : postsToShow,
		exclude   : currentPost.id,
	}, ( value ) => ! isUndefined( value ) );
	const relatedPosts = getEntityRecords( 'postType', 'post', relatedPostsQuery );

	return {
		relatedPosts,
		relatedCategories: postCategories
	};

} )( RelatedPostsEdit );
