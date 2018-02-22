module game {
	/**
	 *
	 * @author redstoone
	 *
	 */

	export class RankingItem extends eui.ItemRenderer {

		private ranking_lab: eui.Label;
		private name_lab: eui.Label;
		private avatar_img: eui.Image;
		private wins_lab: eui.Label;

		public constructor() {
			super();
			this.skinName = "RankingItemSkin";

			// var circle: egret.Shape = new egret.Shape();
			// circle.graphics.beginFill(0x0000ff);
			// circle.graphics.drawCircle(239 + 78, 236 + 78, 78);
			// circle.graphics.endFill();
			// this.addChild(circle);

			// this.avatar_img.mask = circle;
		}

		public dataChanged(): void {
			this.ranking_lab.text = this.data.ranking;
			this.name_lab.text = this.data.name;
			this.avatar_img.source = this.data.avatar;
			this.wins_lab.text = '胜场：' + this.data.wins + '场';
		}
	}
}