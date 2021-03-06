import * as React from 'react';

type TriggerType = 'hover' | 'click' | 'focus';
type PlacementType = 'top' | 'bottom' | 'left' | 'right';

export interface OverlayTriggerProps {
  overlay: React.RefForwardingComponent | React.ReactNode;
  children: React.RefForwardingComponent | React.ReactNode;
  triggers: TriggerType[];
  container?: HTMLElement;
  placement: PlacementType;
}

declare const OverlayTrigger: React.ClassicComponentClass<OverlayTriggerProps>;

export default OverlayTrigger;
