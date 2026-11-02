<?php
if(!defined('ABSPATH'))exit;
add_action('init',function(){
 register_block_pattern_category('ssc',['label'=>'SSC Climate Group']);
 $seed=sscwp_seed();foreach($seed['records']as $r)if($r['path']==='/losningar/grus'){$blocks=parse_blocks($r['content']);break;}
 $find=function($blocks,$class)use(&$find){foreach($blocks as $b){if(in_array($class,explode(' ',$b['attrs']['className']??''),true))return $b;$child=$find($b['innerBlocks']??[],$class);if($child)return $child;}return null;};
 foreach(['cta-band'=>['contact','Kontakt med Daniel'],'solution-banner'=>['solution-hero','Lösningshero med bild']]as $class=>$info){$b=$find($blocks??[],$class);if($b)register_block_pattern('ssc/'.$info[0],['title'=>$info[1],'categories'=>['ssc'],'content'=>serialize_block(sscwp_rewrite_blocks([$b])[0])]);}
 register_block_pattern('ssc/product-layout',['title'=>'Produktsektioner','categories'=>['ssc'],'content'=>'<!-- wp:ssc/product-section {"section":"hero"} /--><!-- wp:ssc/product-section {"section":"benefits"} /--><!-- wp:ssc/product-section {"section":"technical"} /--><!-- wp:ssc/product-section {"section":"downloads"} /--><!-- wp:ssc/product-section {"section":"models"} /-->']);
},20);
