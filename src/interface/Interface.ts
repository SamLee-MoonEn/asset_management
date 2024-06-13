export interface userInfoUpdatesProps {
  [key: string]: {
    readonly uid: string;
    readonly name: string;
    readonly email: string;
  };
}

export interface adminListUpdateProps {
  [key: string]: {
    readonly [x: string]: boolean;
  };
}

export interface adminListRemoveProps {
  [key: string]: null;
}

export interface userInfoProps {
  readonly displayName: string;
  readonly email: string;
  readonly uid: string;
}

export interface assetsDataType {
  readonly itemImage: string;
  readonly itemCode: string;
  readonly itemName: string;
  readonly specification: string;
  readonly serial: string | null;
  readonly status: boolean;
  stock: number;
  readonly storage: string;
  readonly renter: string;
  readonly rentDate: string;
}

export interface userType {
  readonly uid: string;
  readonly email: string;
  readonly name: string;
}

export interface assetUpdateProps {
  readonly itemCode: string;
  readonly itemName: string;
  readonly specification: string;
  readonly serial: string | null;
  readonly stock: number;
  readonly itemImage: string;
  readonly storage: string;
}
