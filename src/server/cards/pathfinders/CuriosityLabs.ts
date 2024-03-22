import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {CardResource} from '../../../common/CardResource';
import {Tag} from '../../../common/cards/Tag';
import {IPlayer} from '../../IPlayer';
import {IActionCard} from '../ICard';
import {Card} from '../Card';

export class CuriosityLabs extends Card implements IActionCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.CURIOSITY_LABS,
      cost: 8,
      tags: [Tag.MICROBE, Tag.SCIENCE, Tag.BUILDING],
      resourceType: CardResource.NANOBOT,

      metadata: {
        cardNumber: 'Pf59',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 1 nanobot to draw a card',
            (ab) => ab.nanobot().startAction.cards(1));
          b.effect('You may store microbes or data on this card as nanobots', () => {});
        }),
      },
    });
  }
  canAct(): boolean {
    return this.resourceCount > 0;
  }

  action(player: IPlayer) {
    this.resourceCount--;
    player.drawCard(1);
    return undefined;
  }
}
