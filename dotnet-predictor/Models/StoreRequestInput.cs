namespace dotnet_predictor.Models
{
    public class StoreRequestInput
    {
        public string StoreId { get; set; }
        public string Item { get; set; }
        public int LastWeekSales { get; set; }
        public double AvgWeeklySales { get; set; }
        public string DayOfWeek { get; set; }
    }
}