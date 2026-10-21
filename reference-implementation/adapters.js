'use strict';

/**
 * Illustrative adapter mapping. Provider SDKs and credentials are deliberately
 * omitted: keep provider syntax at the edge and route policy in orchestrator.js.
 */

function toDialogflowCx(routePlan) {
  return {
    route: routePlan.route,
    fulfillment: { messages: [{ text: { text: [routePlan.nextStep] } }] },
    sessionParameters: { routeReason: routePlan.reason, actionAllowed: false }
  };
}

function toAmazonLexV2(routePlan) {
  return {
    sessionState: {
      dialogAction: { type: routePlan.route === 'CLARIFY' ? 'ElicitIntent' : 'Delegate' },
      sessionAttributes: { route: routePlan.route, actionAllowed: 'false' }
    },
    messages: [{ contentType: 'PlainText', content: routePlan.nextStep }]
  };
}

module.exports = { toDialogflowCx, toAmazonLexV2 };
