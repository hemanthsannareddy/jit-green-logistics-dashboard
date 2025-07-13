using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.ML;
using dotnet_predictor.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Load ML.NET model
var mlContext = new MLContext();
ITransformer trainedModel = mlContext.Model.Load("model.zip", out var inputSchema);
var predictionEngine = mlContext.Model.CreatePredictionEngine<ModelInput, ModelOutput>(trainedModel);

// Register the prediction engine for DI
builder.Services.AddSingleton(predictionEngine);

var app = builder.Build();

// Configure middleware
app.UseRouting();         // ✅ Added back explicitly
app.UseHttpsRedirection();
app.UseAuthorization();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

app.UseCors("AllowAll"); // must be before app.UseAuthorization()

app.UseAuthorization();
app.MapControllers();
app.Run();


app.Run();
