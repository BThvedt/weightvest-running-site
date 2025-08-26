<?php

namespace Drupal\kint_block\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Access\AccessResult;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Render\Markup;
use Drupal\kint_block\Debug\KintCollector;

/**
 * Provides a "Kint dump collector" block.
 *
 * @Block(
 *   id = "kint_block_dump",
 *   admin_label = @Translation("Kint dump collector")
 * )
 */
final class KintDumpBlock extends BlockBase {

  /**
   * Restrict block visibility by permission.
   */
  // public function blockAccess(AccountInterface $account): AccessResult {
  //   return AccessResult::allowedIfHasPermission($account, 'view kint dump block');
  // }

  /**
   * Build the block with queued dumps.
   */
  public function build(): array {
    $html = KintCollector::render();

    // if ($html === '') {
    //   $html = '<em>No Kint dumps queued. Call \Drupal\kint_block\Debug\KintCollector::add(...);</em>';
    // }

    return [
      '#type' => 'container',
      '#attributes' => ['class' => ['kint-block-dump']],
      'dump' => ['#markup' => Markup::create($html)],
    ];
  }

}