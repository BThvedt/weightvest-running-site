<?php

namespace Drupal\health_metrics\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Configure health metrics settings.
 */
class HealthMetricsAdminForm extends ConfigFormBase {
	const CONFIG_NAME = 'health_metrics.settings';

	protected function getEditableConfigNames() {
    return [self::CONFIG_NAME];
  }

	public function getFormId() {
    return 'health_metrics_admin_form';
  }

	public function buildForm(array $form, FormStateInterface $form_state) {
		$config = $this->config(self::CONFIG_NAME);

		 $form['display_mode'] = [
      '#type' => 'radios',
      '#title' => $this->t('Display Mode'),
      '#description' => $this->t('Choose how to display health metrics entries.'),
      '#options' => [
        'number' => $this->t('Display a number of entries'),
        'date' => $this->t('Display starting from a start date'),
      ],
      '#default_value' => $config->get('display_mode') ?? 'number',
      '#required' => TRUE,
    ];

		// Date examples
    $form['number_of_entries'] = [
      '#type' => 'number',
      '#title' => $this->t('Number of Entries'),
      '#description' => $this->t('Enter the number of recent entries to display.'),
      '#default_value' => $config->get('number_of_entries') ?? 10,
      '#min' => 1,
      '#max' => 1000,
      '#step' => 1,
      '#states' => [
        'visible' => [
          ':input[name="display_mode"]' => ['value' => 'number'],
        ],
        'required' => [
          ':input[name="display_mode"]' => ['value' => 'number'],
        ],
      ],
    ];

    $form['start_date'] = [
      '#type' => 'date',
      '#title' => $this->t('Start Date'),
      '#description' => $this->t('Select the date from which to start displaying entries.'),
      '#default_value' => $config->get('start_date'),
      '#states' => [
        'visible' => [
          ':input[name="display_mode"]' => ['value' => 'date'],
        ],
        'required' => [
          ':input[name="display_mode"]' => ['value' => 'date'],
        ],
      ],
    ];

    // Decimal number field
    $form['excersize_max_weight'] = [
      '#type' => 'number',
      '#title' => $this->t('Range for Helth Metrics Weight 0 - (this number)'),
      '#description' => $this->t('Enter a decimal number'),
      '#step' => 0.01, // Allows decimal input with 2 decimal places
      '#min' => 0, // Optional: set minimum value
      '#max' => 999999.99, // Optional: set maximum value
      '#default_value' => $config->get('excersize_max_weight'), // Optional: set default value
      '#required' => FALSE, // Set to TRUE if required
    ];

    // integer field
    $form['interval'] = [
      '#type' => 'number',
      '#title' => $this->t('Interviel'),
      '#description' => $this->t('Every 1st, 2nd, 3rd entery etc... '),
      '#default_value' => $config->get('interval') ?? 1,
      '#min' => 1,
      '#max' => 100,
      '#step' => 1,
      '#required' => TRUE,
    ];

    $form['help'] = [
      '#type' => 'details',
      '#title' => $this->t('Help'),
      '#open' => FALSE,
    ];

    $form['help']['info'] = [
      '#markup' => $this->t('
        <p><strong>Display a number of entries:</strong> Shows the most recent X entries.</p>
        <p><strong>Display starting from a start date:</strong> Shows all entries from the selected date onwards.</p>
        <p>These settings will affect how health metrics are displayed throughout the site.</p>
      '),
    ];

    return parent::buildForm($form, $form_state);
	}

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    $display_mode = $form_state->getValue('display_mode');
    
    // Validate number of entries when in number mode
    if ($display_mode === 'number') {
      $number_of_entries = $form_state->getValue('number_of_entries');
      if (empty($number_of_entries) || $number_of_entries < 1) {
        $form_state->setErrorByName('number_of_entries', 
          $this->t('Number of entries must be at least 1.'));
      }
    }
    
    // Validate start date when in date mode
    if ($display_mode === 'date') {
      $start_date = $form_state->getValue('start_date');
      if (empty($start_date)) {
        $form_state->setErrorByName('start_date', 
          $this->t('Start date is required when using date display mode.'));
      }
      
      // Check if date is not in the future
      if ($start_date && $start_date > date('Y-m-d')) {
        $form_state->setErrorByName('start_date', 
          $this->t('Start date cannot be in the future.'));
      }
    }

    parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $config = $this->config(self::CONFIG_NAME);
    
    $config->set('display_mode', $form_state->getValue('display_mode'));
    $config->set('number_of_entries', $form_state->getValue('number_of_entries'));
    $config->set('start_date', $form_state->getValue('start_date'));
    $config->set('excersize_max_weight', $form_state->getValue('excersize_max_weight'));
    $config->set('interval', $form_state->getValue('interval'));
    
    $config->save();

    $this->messenger()->addMessage(
      $this->t('Health metrics display settings have been saved.')
    );

    parent::submitForm($form, $form_state);
  }
}