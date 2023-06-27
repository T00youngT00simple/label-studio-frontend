import { inject, observer } from 'mobx-react';
import { Button } from '../../common/Button/Button';
import { Tooltip } from '../../common/Tooltip/Tooltip';
import { Block, Elem } from '../../utils/bem';
import { isDefined } from '../../utils/utilities';
import { IconBan } from '../../assets/icons';

import './Controls.styl';
import { useCallback, useMemo, useState } from 'react';

const TOOLTIP_DELAY = 0.8;

const ButtonTooltip = inject('store')(observer(({ store, title, children }) => {
  return (
    <Tooltip
      title={title}
      enabled={store.settings.enableTooltips}
      mouseEnterDelay={TOOLTIP_DELAY}
    >
      {children}
    </Tooltip>
  );
}));

const controlsInjector = inject(({ store }) => {
  return {
    store,
    history: store?.annotationStore?.selected?.history,
  };
});

export const Controls = controlsInjector(observer(({ store, history, annotation }) => {
  const buttons = [];

  if ( store.hasInterface('submit')) {
    buttons.push(
      <ButtonTooltip key="submit" title={"sdf"}>
        <Elem name="tooltip-wrapper">
          <Button aria-label="submit" onClick={() => {
            store.addInterface('skip');
          }}>
            Submit
          </Button>
        </Elem>
      </ButtonTooltip>,
    );
  }

  if ( store.hasInterface('skip')) {
    buttons.push(
      <ButtonTooltip key="skip" title={"sdf"}>
        <Elem name="tooltip-wrapper">
          <Button aria-label="submit" onClick={() => {

          }}>
            skip
          </Button>
        </Elem>
      </ButtonTooltip>,
    );
  }

  return (
    <Block name="controls">
      {buttons}
    </Block>
  );
}));
