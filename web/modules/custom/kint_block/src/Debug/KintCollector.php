<?php

namespace Drupal\kint_block\Debug;

use Kint\Kint;

/**
 * Static collector for Kint dumps.
 *
 * Usage:
 *   \Drupal\kint_block\Debug\KintCollector::add($var1, $var2);
 */
final class KintCollector {

  /** @var array<int, array<int, mixed>> */
  protected static array $vars = [];

  /**
   * Queue one or more variables.
   */
  public static function add(...$vars): void {
    if (!empty($vars)) {
      self::$vars[] = $vars;
    }
  }

  /**
   * Render all queued dumps into HTML and clear the queue.
   */
  public static function render(): string {
    if (empty(self::$vars)) {
      return '';
    }

    $prev = Kint::$return;
    Kint::$return = true;

    $html = '';
    foreach (self::$vars as $set) {
      $html .= Kint::dump(...$set);
    }

    Kint::$return = $prev;
    self::$vars = [];
    return $html;
  }

}