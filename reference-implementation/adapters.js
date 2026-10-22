'use strict';

/**
 * Illustrative adapter mapping. Provider SDKs and credentials are deliberately
 * omitted: keep provider syntax at the edge and route policy in orchestrator.js.
 */

function validateRoutePlan(routePlan) {
  if (!routePlan || typeof routePlan !== 'object' || !routePlan.route || !routePlan.nextStep) throw new Error('A complete route plan is required.');
  return routePlan;
}

function toDialogflowCx(routePlan) {
  routePlan = validateRoutePlan(routePlan);
  return {
    contractVersion: routePlan.contractVersion || '1.0',
    route: routePlan.route,
    fulfillment: { messages: [{ text: { text: [routePlan.nextStep] } }] },
    sessionParameters: { routeReason: routePlan.reason, actionAllowed: false, policyVersion: routePlan.policyVersion || 'unknown', sourceIds: routePlan.controls?.sourceIds || [] }
  };
}

function toAmazonLexV2(routePlan) {
  routePlan = validateRoutePlan(routePlan);
  return {
    sessionState: {
      dialogAction: { type: routePlan.route === 'CLARIFY' ? 'ElicitIntent' : 'Delegate' },
      sessionAttributes: { route: routePlan.route, actionAllowed: 'false', policyVersion: routePlan.policyVersion || 'unknown', sourceIds: JSON.stringify(routePlan.controls?.sourceIds || []) }
    },
    messages: [{ contentType: 'PlainText', content: routePlan.nextStep }]
  };
}

module.exports = { validateRoutePlan, toDialogflowCx, toAmazonLexV2 };
