<?php
if (!defined('ABSPATH')) exit;
define('SSCWP_VERSION','2.1.0');
require_once __DIR__.'/inc/blocks.php';
require_once __DIR__.'/inc/products.php';
require_once __DIR__.'/inc/import.php';
require_once __DIR__.'/inc/patterns.php';
add_action('after_setup_theme',function(){add_theme_support('title-tag');add_theme_support('post-thumbnails');add_theme_support('editor-styles');add_editor_style(['assets/theme.css','assets/styles.css','assets/editor.css']);});
add_filter('body_class',function($classes){if(is_front_page())$classes[]='home-head';return $classes;});
add_action('wp_enqueue_scripts',function(){wp_enqueue_style('ssc-tokens',get_theme_file_uri('assets/theme.css'),[],SSCWP_VERSION);wp_enqueue_style('ssc-design',get_theme_file_uri('assets/styles.css'),['ssc-tokens'],SSCWP_VERSION);wp_enqueue_style('ssc-wordpress',get_theme_file_uri('assets/wordpress.css'),['ssc-design'],SSCWP_VERSION);wp_enqueue_script('ssc-front',get_theme_file_uri('assets/front.js'),[],SSCWP_VERSION,true);wp_add_inline_script('ssc-front','window.SSCWPRoutes='.wp_json_encode(get_option('sscwp_route_map',[])).';','before');});
add_filter('render_block_core/template-part',function($content,$block){$slug=$block['attrs']['slug']??'';if(in_array($slug,['header','footer'],true))$content=preg_replace('/^<(header|footer|div)\b/','<$1 id="'.$slug.'"',$content,1);return $content;},10,2);
add_filter('render_block_core/template-part',function($content,$block){
 if(($block['attrs']['slug']??'')!=='header')return $content;
 $path=is_singular()?get_post_meta(get_queried_object_id(),'_ssc_seed_path',true):'';
 if(is_singular('ssc_product')||is_tax('ssc_category'))$target='/produkter';elseif(str_starts_with($path,'/losningar'))$target='/losningar';elseif(is_singular('ssc_customer')||$path==='/kunder')$target='/kunder';elseif(str_starts_with($path,'/service'))$target='/service';else $target='';
 $processor=new WP_HTML_Tag_Processor($content);
 while($processor->next_tag()){
  if($processor->get_tag()==='A'&&$target&&$processor->get_attribute('href')===sscwp_url($target))$processor->set_attribute('aria-current','page');
  if($processor->get_tag()==='DETAILS'&&str_contains($processor->get_attribute('class')??'','company-menu')&&($path==='/om-oss'||str_starts_with($path,'/om-oss/')||str_starts_with($path,'/nyheter')))$processor->add_class('is-current');
 }
 return $processor->get_updated_html();
},20,2);
add_action('wp_head',function(){
 if(defined('WPSEO_VERSION')||defined('RANK_MATH_VERSION'))return;
 $id=get_queried_object_id();$description=is_singular()?get_post_meta($id,'_ssc_description',true):'';$image=is_singular()?get_the_post_thumbnail_url($id,'full'):'';
 if(is_tax('ssc_category')){$term=get_queried_object();$description=$term->description;$image=sscwp_asset(get_term_meta($term->term_id,'_ssc_image',true));}
 if(!$description)return;$url=is_singular()?get_permalink($id):get_term_link(get_queried_object());if(is_wp_error($url))return;
 echo '<meta name="description" content="'.esc_attr($description).'">' . "\n";
 foreach(['type'=>'website','locale'=>'sv_SE','title'=>wp_get_document_title(),'description'=>$description,'url'=>$url,'image'=>$image] as $key=>$value)if($value)echo '<meta property="og:'.esc_attr($key).'" content="'.esc_attr($value).'">' . "\n";
 if(is_tax())echo '<link rel="canonical" href="'.esc_url($url).'">' . "\n";
});
add_filter('wp_robots',function($robots){if(is_singular()&&get_post_meta(get_queried_object_id(),'_ssc_noindex',true)){$robots['noindex']=true;unset($robots['index']);}return $robots;});
add_filter('wp_sitemaps_posts_query_args',function($args){$args['meta_query'][]=['relation'=>'OR',['key'=>'_ssc_noindex','compare'=>'NOT EXISTS'],['key'=>'_ssc_noindex','value'=>'1','compare'=>'!=']];return $args;});
add_action('admin_notices',function(){if(current_user_can('manage_options')&&!get_option('sscwp_import_complete_210'))echo '<div class="notice notice-info"><p>SSC: Temat är klart. <a href="'.esc_url(admin_url('themes.php?page=sscwp-setup')).'">Öppna SSC – kom igång</a> för att importera webbplatsens innehåll.</p></div>';});
