import { ServiceObject } from "../../ServiceObject";
import { BusinessTypeEnum } from "../BusinessTypeEnum";

export class CategoryModel extends ServiceObject {
    private businessType: BusinessTypeEnum;
    private createdBy: string;
    private categoryName: string;
    private icon: string;
    private defaultImage: string;
    private photos: Array<string>;
    private sortingOrder: number;
    private categoryStatus: string;
    private remarks: string;

    public getBusinessType(): BusinessTypeEnum {
        return this.businessType;
    }

    public setBusinessType(businessType: BusinessTypeEnum): void {
        this.businessType = businessType;
    }

    public getCreatedBy(): string {
        return this.createdBy;
    }

    public setCreatedBy(createdBy: string): void {
        this.createdBy = createdBy;
    }

    public getCategoryName(): string {
        return this.categoryName;
    }

    public setCategoryName(categoryName: string): void {
        this.categoryName = categoryName;
    }

    public getIcon(): string {
        return this.icon;
    }

    public setIcon(icon: string): void {
        this.icon = icon;
    }

    public getDefaultImage(): string {
        return this.defaultImage;
    }

    public setDefaultImage(defaultImage: string): void {
        this.defaultImage = defaultImage;
    }

    public getPhotos(): Array<string> {
        if (this.photos == undefined) {
            this.photos = [];
        }
        return this.photos;
    }

    public setPhotos(photos: Array<string>): void {
        this.photos = photos;
    }

    public getSortingOrder(): number {
        return this.sortingOrder;
    }

    public setSortingOrder(sortingOrder: number): void {
        this.sortingOrder = sortingOrder;
    }

    public getCategoryStatus(): string {
        return this.categoryStatus;
    }

    public setCategoryStatus(categoryStatus: string): void {
        this.categoryStatus = categoryStatus;
    }

    public getRemarks(): string {
        return this.remarks;
    }

    public setRemarks(remarks: string): void {
        this.remarks = remarks;
    }

}
