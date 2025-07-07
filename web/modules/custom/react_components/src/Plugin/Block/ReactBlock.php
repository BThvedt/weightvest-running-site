<?php
namespace Drupal\react_components\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'ReactBlock' block.
 *
 * @Block(
 * id = "react_block",
 * admin_label = @Translation("React block"),
 * )
 */
class ReactBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $build['react_block'] = [
      '#markup' => '<div id="react-root"></div>',
      '#attached' => [
        'library' => ['react_components/react-components-lib']
      ],
    ];
    return $build;
  }
}
