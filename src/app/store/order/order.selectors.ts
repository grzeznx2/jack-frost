import { AppState } from '../app.state';

export interface OrdersSummary {
  flavorSummary: {
    flavorNames: string[];
    byFlavorName: {
      [key: string]: {
        flavorName: string;
        totalWeight: number;
      };
    };
  };
  userSummary: {
    userName: string;
    flavorUnits: {
      flavorName: string;
      unitName: string;
      weight: number;
      amount: number;
    }[];
  }[];
}

export const selectOrders = (state: AppState) => state.orders;

export const selectOrdersLoading = (state: AppState) =>
  state.orders.all.loading;
export const selectOrdersError = (state: AppState) => state.orders.all.error;

export const selectOrdersSummary = (state: AppState) => {
  const { idList: ordersIdList } = state.orders.all;
  const { byIds: ordersByIds } = state.orders.all;
  const unitsByIds = state.units.byIds;
  const flavorsByIds = state.flavors.byIds;
  const usersByIds = state.users.byIds;
  const ordersSummary: OrdersSummary = {
    flavorSummary: {
      flavorNames: [],
      byFlavorName: {},
    },
    userSummary: [],
  };
  ordersIdList.forEach((orderId) => {
    const order = ordersByIds[orderId];
    const flavorUnits = order.flavorUnits.map((flavorUnit) => {
      const flavorName = flavorsByIds[flavorUnit.flavorId].name;
      const amount = flavorUnit.amount;
      const weight = unitsByIds[flavorUnit.unitId].weight;
      const totalWeight = amount * weight;

      if (ordersSummary.flavorSummary.byFlavorName[flavorName]) {
        ordersSummary.flavorSummary.byFlavorName[flavorName] = {
          ...ordersSummary.flavorSummary.byFlavorName[flavorName],
          totalWeight:
            ordersSummary.flavorSummary.byFlavorName[flavorName].totalWeight +
            totalWeight,
        };
      } else {
        ordersSummary.flavorSummary.byFlavorName[flavorName] = {
          flavorName,
          totalWeight,
        };
        ordersSummary.flavorSummary.flavorNames.push(flavorName);
      }

      return {
        flavorName,
        unitName: unitsByIds[flavorUnit.unitId].name,
        weight,
        amount,
        totalWeight,
      };
    });
    const userName =
      usersByIds[order.userId].firstName +
      ' ' +
      usersByIds[order.userId].lastName;
    ordersSummary.userSummary.push({ userName, flavorUnits });
  });

  return ordersSummary;
};

export const selectFlavorUnitList = (state: AppState) => {
  const { flavorUnitIdList, byFlavorUnitId } = state.orders.current;
  const result = flavorUnitIdList.map(
    (flavorUnitId) => byFlavorUnitId[flavorUnitId]
  );
  return result;
};

export const selectLastUserOrder = (state: AppState) =>
  state.orders.lastUserOrder;

export const selectAllOrders = (state: AppState) => state.orders.all;

export const selectActualOrdersId = (state: AppState) => {
  const { idList, byIds } = state.orders.all;
  return idList.filter((id) => {
    const order = byIds[id];
    return checkIsToday(order.createdAt);
  });
};

export const selectUserHasOrderedToday = (state: AppState) => {
  const { lastUserOrder } = state.orders;
  if (!lastUserOrder) return false;
  else return checkIsToday(lastUserOrder.createdAt);
};

const checkIsToday = (
  date?: Date | { seconds: number; nanoseconds: number }
) => {
  if (!date) return false;
  if (date instanceof Date) {
    return isToday(date);
  }
  const formattedDate = new Date(
    date.seconds * 1000 + date.nanoseconds / 1000000
  );
  return isToday(formattedDate);
};

const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  );
};
