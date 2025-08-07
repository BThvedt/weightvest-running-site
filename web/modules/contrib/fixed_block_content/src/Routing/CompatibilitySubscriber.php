<?php

namespace Drupal\fixed_block_content\Routing;

use Drupal\Core\Routing\RouteSubscriberBase;
use Symfony\Component\Routing\RouteCollection;
use Composer\Semver\Comparator;

/**
 * Route subscriber to maintain compatibility with Drupal 10.0 and below routes.
 *
 * @todo Remove once Drupal 9 and Drupal 10.0 are no longer supported.
 */
class CompatibilitySubscriber extends RouteSubscriberBase {

  /**
   * {@inheritdoc}
   */
  protected function alterRoutes(RouteCollection $collection) {
    if (Comparator::lessThan(\Drupal::VERSION, '10.1')) {
      if ($route = $collection->get('entity.fixed_block_content.collection')) {
        $route->setPath('/admin/structure/block/block-content/fixed-block-content');
        $route->setRequirement('_permission', 'administer blocks');
      }

      if ($route = $collection->get('fixed_block_content.form_add')) {
        $route->setPath('/admin/structure/block/block-content/fixed-block-content/add');
        $route->setRequirement('_permission', 'administer blocks');
      }

      if ($route = $collection->get('entity.fixed_block_content.edit_form')) {
        $route->setPath('/admin/structure/block/block-content/fixed-block-content/manage/{fixed_block_content}/edit');
      }

      if ($route = $collection->get('entity.fixed_block_content.delete_form')) {
        $route->setPath('/admin/structure/block/block-content/fixed-block-content/manage/{fixed_block_content}/delete');
      }

      if ($route = $collection->get('entity.fixed_block_content.export_form')) {
        $route->setPath('/admin/structure/block/block-content/fixed-block-content/manage/{fixed_block_content}/export');
      }

      if ($route = $collection->get('entity.fixed_block_content.import_form')) {
        $route->setPath('/admin/structure/block/block-content/fixed-block-content/manage/{fixed_block_content}/import');
      }
    }
  }

}
