using Microsoft.ML;
using Microsoft.ML.Data;
using System;

public class SalesData
{
    [LoadColumn(0)]
    public string StoreId { get; set; }

    [LoadColumn(1)]
    public string Item { get; set; }

    [LoadColumn(2)]
    public float LastWeekSales { get; set; }

    [LoadColumn(3)]
    public float AvgWeeklySales { get; set; }

    [LoadColumn(4)]
    public string DayOfWeek { get; set; }

    [LoadColumn(5)]
    public float QuantityNeeded { get; set; }
}

public class SalesPrediction
{
    public float Score { get; set; }
}

class Program
{
    static void Main()
    {
        var mlContext = new MLContext();

        // Load training data
        IDataView dataView = mlContext.Data.LoadFromTextFile<SalesData>(
            path: "processed_sales_data.csv",
            hasHeader: true,
            separatorChar: ',');

        // Define pipeline
        var pipeline = mlContext.Transforms.Categorical.OneHotEncoding("DayOfWeekEncoded", "DayOfWeek")
            .Append(mlContext.Transforms.Concatenate("Features", "LastWeekSales", "AvgWeeklySales", "DayOfWeekEncoded"))
            .Append(mlContext.Regression.Trainers.Sdca(labelColumnName: "QuantityNeeded"));

        // Train model
        var model = pipeline.Fit(dataView);

        // Save model
        mlContext.Model.Save(model, dataView.Schema, "model.zip");
        Console.WriteLine("✅ model.zip generated successfully!");

        // Evaluate model
        var predictions = model.Transform(dataView);
        var metrics = mlContext.Regression.Evaluate(predictions, labelColumnName: "QuantityNeeded");

        // Print evaluation metrics
        Console.WriteLine("\n📊 Model Evaluation Metrics:");
        Console.WriteLine($"🔸 R² Score: {metrics.RSquared:0.##}");
        Console.WriteLine($"🔸 RMSE    : {metrics.RootMeanSquaredError:0.##}");
        Console.WriteLine($"🔸 MAE     : {metrics.MeanAbsoluteError:0.##}");
    }
}
