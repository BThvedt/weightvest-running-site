<?php

namespace Drupal\general\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Text and Image' Block.
 *
 * @Block(
 *   id = "social_block",
 *   admin_label = @Translation("Social Block")
 * )
 */
class SocialBlock extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function build() {
     $markup = '
      <div>
        <h5 class="font-bold mb-xs">' . $this->t('Follow the craziness on:') .'</h5>
        <div class="display-flex">
          <a class="display-inline-block py-sm pr-sm mr-md display-inline-block text-blue no-underline hover:text-orange transition-colors-fast" href="https://bsky.app/profile/weightvestrunning.bsky.social" target="_blank" rel="noopener" aria-label="Follow me on Bluesky">
            <i class="fab fa-bluesky text-3xl"></i>
          </a>
          <a class="display-inline-block py-sm pr-sm mr-md display-inline-block text-blue no-underline hover:text-orange transition-colors-fast" href="https://www.youtube.com/channel/UCM_zARPhp6vxmzoSt8kcP2g" target="_blank" rel="noopener" aria-label="Follow me on YouTuve">
            <i class="fab fa-youtube text-3xl"></i>
          </a>
          <a class="display-inline-block py-sm pr-sm mr-md display-inline-block text-blue no-underline hover:text-orange transition-colors-fast" href="https://www.facebook.com/WeightVestRunning" target="_blank" rel="noopener" aria-label="Follow me on FaceBook">
            <i class="fab fa-facebook-f facebook-logo"></i>
          </a>
        </div>
      </div>
    ';

    return [
      '#markup' => $markup
    ];
  }
}