<?php

namespace Drupal\general\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Text and Image' Block.
 *
 * @Block(
 *   id = "guinea_pig_block",
 *   admin_label = @Translation("Guinea Pig Block")
 * )
 */
class GuineaPigBlock extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function build() {
    $module_path = \Drupal::service('extension.list.module')->getPath('general');
    $image_url = '/' . $module_path . '/images/guinea_pig.jpg';

    return [
      '#markup' => '
				<div class="hover:text-orange">
					<a class="no-underline" href = "/penny">
						<div class="footer-guinea-pig block display-flex items-center mt-lg mb-lg">
							<img class="mr-lg" src="' . $image_url . '" alt="Penny the Guinea Pig" />
							<p class="position-relative bottom-2px">Dedicated to Penny, <br />the Best Guinea Pig</p>
						</div>
					</a>
				</div>
      ',
    ];
  }
}