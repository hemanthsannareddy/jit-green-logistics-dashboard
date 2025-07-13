using Microsoft.AspNetCore.Mvc;
using dotnet_predictor.Models;
using Microsoft.ML;

namespace dotnet_predictor.Controllers
{
    [ApiController]
    [Route("/predict-demand")]
    public class PredictionController : ControllerBase
    {
        private readonly PredictionEngine<ModelInput, ModelOutput> _predictionEngine;

        public PredictionController(PredictionEngine<ModelInput, ModelOutput> predictionEngine)
        {
            _predictionEngine = predictionEngine;
        }

        [HttpPost]
        public ActionResult<StorePrediction> Predict([FromBody] StoreRequestInput input)
        {
            var modelInput = new ModelInput
            {
                LastWeekSales = (float)input.LastWeekSales,
                AvgWeeklySales = (float)input.AvgWeeklySales,
                DayOfWeek = input.DayOfWeek
            };

            var prediction = _predictionEngine.Predict(modelInput);

            return Ok(new StorePrediction
            {
                StoreId = input.StoreId,
                Item = input.Item,
                PredictedQuantity = (int)Math.Round((double)prediction.Score)
            });
        }
    }
}
