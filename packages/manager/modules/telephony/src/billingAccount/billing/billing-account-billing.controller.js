

export default /* @ngInject */ function TelecomTelephonyBillingAccountBillingCtrl(
  $translate,
  TELEPHONY_REDIRECT_URLS,
) {
  const self = this;

  self.actions = null;

  /*= =====================================
    =            INITIALIZATION            =
    ====================================== */

  function init() {
    self.actions = [{
      name: 'group_billing_bill',
      main: true,
      picto: 'ovh-font-receipt',
      sref: 'telephony.billingAccount.billing.bill',
      text: $translate.instant('telephony_group_billing_actions_group_billing_bill'),
    }, {
      name: 'group_billing_deposit',
      sref: 'telephony.billingAccount.billing.deposit',
      text: $translate.instant('telephony_group_billing_actions_group_billing_deposit'),
    }, {
      name: 'group_billing_deposit_movement',
      sref: 'telephony.billingAccount.depositMovement',
      text: $translate.instant('telephony_group_billing_actions_group_billing_deposit_movement'),
    }, {
      name: 'group_billing_credit_threshold',
      sref: 'telephony.billingAccount.creditThreshold',
      text: $translate.instant('telephony_group_billing_actions_group_billing_credit_threshold'),
    }, {
      name: 'group_call_list_summary',

      // url: TelephonyMediator.getV6ToV4RedirectionUrl("group.group_call_list_summary"),
      sref: 'telephony.billingAccount.billing.summary',
      text: $translate.instant('telephony_group_billing_actions_group_call_list_summary'),
    }, {
      name: 'group_repayments',
      sref: 'telephony.billingAccount.billing.groupRepayments',
      text: $translate.instant('telephony_group_billing_actions_group_repayments'),
    }, {
      name: 'group_reversments_history',
      sref: 'telephony.billingAccount.billing.repayment-history',
      text: $translate.instant('telephony_group_billing_actions_group_reversments_history'),
    }, {
      name: 'group_group_called_fees',
      sref: 'telephony.billingAccount.billing.calledFees',
      text: $translate.instant('telephony_group_billing_actions_group_group_called_fees'),
    }, {
      name: 'group_called_fees_history',
      sref: 'telephony.billingAccount.billing.tollfree-history',
      text: $translate.instant('telephony_group_billing_actions_group_called_fees_history'),
    }, {
      name: 'group_banking_management',
      url: TELEPHONY_REDIRECT_URLS.billingMean,
      isExternal: true,
      text: $translate.instant('telephony_group_billing_actions_group_banking_management'),
    }, {
      name: 'group_delayed_account_transfert',
      url: TELEPHONY_REDIRECT_URLS.ovhAccount,
      isExternal: true,
      text: $translate.instant('telephony_group_billing_actions_group_delayed_account_transfert'),
    }];
  }

  /* -----  End of INITIALIZATION  ------*/

  init();
}