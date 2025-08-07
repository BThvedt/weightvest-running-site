<?php

namespace Drupal\fixed_block_content\Plugin\Derivative;

use Composer\Semver\Comparator;
use Drupal\Component\Plugin\Derivative\DeriverBase;

/**
 * Adjust tasks for D9/D10.0 structure.
 *
 * @todo Remove once D9 and D10.0 are no longer supported.
 */
class CompatibilityListTask extends DeriverBase {

  /**
   * {@inheritdoc}
   */
  public function getDerivativeDefinitions($base_plugin_definition) {
    // Implement dynamic logic to mimic the D9/D10.0 structure.
    $this->derivatives['fixed_block_content.list_tab'] = $base_plugin_definition;

    if (Comparator::lessThan(\Drupal::VERSION, '10.1')) {
      unset($this->derivatives['fixed_block_content.list_tab']);
    }

    return parent::getDerivativeDefinitions($base_plugin_definition);
  }

}
