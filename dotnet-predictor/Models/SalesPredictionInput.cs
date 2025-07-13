namespace dotnet_predictor.Models
{
    public class SalesPredictionInput
    {
        public string StoreId { get; set; }
        public string Item { get; set; }
        public float LastWeekSales { get; set; }
        public float AvgWeeklySales { get; set; }
        public string DayOfWeek { get; set; }
    }

    public class SalesPredictionResult
    {
        public float QuantityNeeded { get; set; }
    }
}
