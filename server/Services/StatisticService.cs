namespace server.Services
{
    public interface StatisticService
    {
        public dynamic getAvenueByPrecious();
        public dynamic getNewCustomerByPrecious();
        public dynamic getNewOrderByPrecious();
        public dynamic getTotalCar();
        public dynamic getAvenueByMonth();
        public dynamic getNewCustomerByMonth();
        public dynamic getDataBrand();
        public dynamic getAvenueEachShowroom();
        public dynamic getTopSellCar();
        public dynamic getAvenueByCountry();
        public dynamic getHighestAvenueCountry();
    }
}
