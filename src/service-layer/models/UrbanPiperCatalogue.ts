export class UrbanPiperCatalogue {
    private categories: Array<UrbanPiperCategory>;
    private flush_items: boolean;
    private items: Array<UrbanPiperItem>;
    private option_groups: Array<UrbanPiperOptionGroup>;
    private flush_options: boolean;
    private options: Array<UrbanPiperOption>;
    private charges: Array<UrbanPiperCharge>;

    public getCategories(): Array<UrbanPiperCategory> {
        return this.categories;
    }

    public setCategories(categories: Array<UrbanPiperCategory>): void {
        this.categories = categories;
    }

    public isFlush_items(): boolean {
        return this.flush_items;
    }

    public setFlush_items(flush_items: boolean): void {
        this.flush_items = flush_items;
    }

    public getItems(): Array<UrbanPiperItem> {
        return this.items;
    }

    public setItems(items: Array<UrbanPiperItem>): void {
        this.items = items;
    }

    public getOption_groups(): Array<UrbanPiperOptionGroup> {
        return this.option_groups;
    }

    public setOption_groups(option_groups: Array<UrbanPiperOptionGroup>): void {
        this.option_groups = option_groups;
    }

    public isFlush_options(): boolean {
        return this.flush_options;
    }

    public setFlush_options(flush_options: boolean): void {
        this.flush_options = flush_options;
    }

    public getOptions(): Array<UrbanPiperOption> {
        return this.options;
    }

    public setOptions(options: Array<UrbanPiperOption>): void {
        this.options = options;
    }

    public getCharges(): Array<UrbanPiperCharge> {
        return this.charges;
    }

    public setCharges(charges: Array<UrbanPiperCharge>): void {
        this.charges = charges;
    }
}

export class UrbanPiperCategory {
    private ref_id: string;
    private name: string;
    private description: string;
    private sort_order: number;
    private active: string;
    private img_url: string;
    private translations: Array<Translations>;

    public getRef_id(): string {
        return this.ref_id;
    }

    public setRef_id(ref_id: string): void {
        this.ref_id = ref_id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getSort_order(): number {
        return this.sort_order;
    }

    public setSort_order(sort_order: number): void {
        this.sort_order = sort_order;
    }

    public getActive(): string {
        return this.active;
    }

    public setActive(active: string): void {
        this.active = active;
    }

    public getImg_url(): string {
        return this.img_url;
    }

    public setImg_url(img_url: string): void {
        this.img_url = img_url;
    }

    public getTranslations(): Array<Translations> {
        return this.translations;
    }

    public setTranslations(translations: Array<Translations>): void {
        this.translations = translations;
    }
}

export class Translations {
    private language: string;
    private name: string;
    private description: string;

    public getLanguage(): string {
        return this.language;
    }

    public setLanguage(language: string): void {
        this.language = language;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }
}

export class UPItem {
    private ref_id: string;
    private title: string;
    private available: boolean;
    private description: string;
    private price: number;
    private sold_at_store: boolean;
    private translations: Array<Translations>;

    public getRef_id(): string {
        return this.ref_id;
    }

    public setRef_id(ref_id: string): void {
        this.ref_id = ref_id;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public isAvailable(): boolean {
        return this.available;
    }

    public setAvailable(available: boolean): void {
        this.available = available;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public isSold_at_store(): boolean {
        return this.sold_at_store;
    }

    public setSold_at_store(sold_at_store: boolean): void {
        this.sold_at_store = sold_at_store;
    }

    public getTranslations(): Array<Translations> {
        return this.translations;
    }

    public setTranslations(translations: Array<Translations>): void {
        this.translations = translations;
    }

}

export class UrbanPiperItem extends UPItem{
    private current_stock: number;
    private recommended: boolean;
    private food_type: string;
    private category_ref_ids : Array<string>;
    private tags: {};
    private included_platforms : Array<string>;

    public getCurrent_stock(): number {
        return this.current_stock;
    }

    public setCurrent_stock(current_stock: number): void {
        this.current_stock = current_stock;
    }

    public isRecommended(): boolean {
        return this.recommended;
    }

    public setRecommended(recommended: boolean): void {
        this.recommended = recommended;
    }

    public getFood_type(): string {
        return this.food_type;
    }

    public setFood_type(food_type: string): void {
        this.food_type = food_type;
    }

    public getCategory_ref_ids(): Array<string> {
        return this.category_ref_ids;
    }

    public setCategory_ref_ids(category_ref_ids: Array<string>): void {
        this.category_ref_ids = category_ref_ids;
    }

    public getTags(): {} {
        return this.tags;
    }

    public setTags(tags: {}): void {
        this.tags = tags;
    }

    public getIncluded_platforms(): Array<string> {
        return this.included_platforms;
    }

    public setIncluded_platforms(included_platforms: Array<string>): void {
        this.included_platforms = included_platforms;
    }

}

export class UrbanPiperOptionGroup {
    private ref_id: string;
    private title: string;
    private min_selectable: number;
    private max_selectable: number;
    private active: boolean;
    private item_ref_ids: Array<string>;

    public getRef_id(): string {
        return this.ref_id;
    }

    public setRef_id(ref_id: string): void {
        this.ref_id = ref_id;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getMin_selectable(): number {
        return this.min_selectable;
    }

    public setMin_selectable(min_selectable: number): void {
        this.min_selectable = min_selectable;
    }

    public getMax_selectable(): number {
        return this.max_selectable;
    }

    public setMax_selectable(max_selectable: number): void {
        this.max_selectable = max_selectable;
    }

    public isActive(): boolean {
        return this.active;
    }

    public setActive(active: boolean): void {
        this.active = active;
    }

    public getItem_ref_ids(): Array<string> {
        return this.item_ref_ids;
    }

    public setItem_ref_ids(item_ref_ids: Array<string>): void {
        this.item_ref_ids = item_ref_ids;
    }

}

export class UrbanPiperOption extends UPItem{
    private weight: number;
    private opt_grp_ref_ids: Array<string>;
    private nested_opt_grps: [];

    public getWeight(): number {
        return this.weight;
    }

    public setWeight(weight: number): void {
        this.weight = weight;
    }

    public getOpt_grp_ref_ids(): Array<string> {
        return this.opt_grp_ref_ids;
    }

    public setOpt_grp_ref_ids(opt_grp_ref_ids: Array<string>): void {
        this.opt_grp_ref_ids = opt_grp_ref_ids;
    }

    public getNested_opt_grps(): [] {
        return this.nested_opt_grps;
    }

    public setNested_opt_grps(nested_opt_grps: []): void {
        this.nested_opt_grps = nested_opt_grps;
    }
}

export class UrbanPiperCharge extends UPItem{
    private active: boolean;
    private structure: {};
    private fulfillment_modes: Array<string>;
    private excluded_platforms: Array<string>;
    private item_ref_ids: Array<string>;

    public isActive(): boolean {
        return this.active;
    }

    public setActive(active: boolean): void {
        this.active = active;
    }

    public getStructure(): {} {
        return this.structure;
    }

    public setStructure(structure: {}): void {
        this.structure = structure;
    }

    public getFulfillment_modes(): Array<string> {
        return this.fulfillment_modes;
    }

    public setFulfillment_modes(fulfillment_modes: Array<string>): void {
        this.fulfillment_modes = fulfillment_modes;
    }

    public getExcluded_platforms(): Array<string> {
        return this.excluded_platforms;
    }

    public setExcluded_platforms(excluded_platforms: Array<string>): void {
        this.excluded_platforms = excluded_platforms;
    }

    public getItem_ref_ids(): Array<string> {
        return this.item_ref_ids;
    }

    public setItem_ref_ids(item_ref_ids: Array<string>): void {
        this.item_ref_ids = item_ref_ids;
    }

}