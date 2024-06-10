using Microsoft.EntityFrameworkCore;
using server.Middleware;
using server.Models;
using server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration["ConnectionStrings:DefaultConnect"];
builder.Services.AddDbContext<DatabaseContext>(option=>option.UseLazyLoadingProxies().UseSqlServer(connectionString));
builder.Services.AddScoped<AccountService,AccountServiceImpl>();
builder.Services.AddScoped<EmployeeService,EmployeeServiceImpl>();
builder.Services.AddScoped<CustomerService,CustomerServiceImpl>();
builder.Services.AddScoped<SupplierService,SupplierServiceImpl>();
builder.Services.AddScoped<ColorService,ColorServiceImpl>();
builder.Services.AddScoped<InOrderService, InOrderServiceImpl>();
builder.Services.AddScoped<OutOrderService, OutOrderServiceImpl>();
builder.Services.AddScoped<ContactService,ContactServiceImpl>();
builder.Services.AddScoped<RequestService,RequestServiceImpl>();
builder.Services.AddScoped<CountriesService,CountriesServiceImpl>();
builder.Services.AddScoped<InVoiceService, InVoiceServiceImpl>();
builder.Services.AddScoped<DistrictService, DistrictServiceImpl>();
builder.Services.AddScoped<CityService, CityServiceImpl>();
builder.Services.AddScoped<WareHouserService, WareHouserServiceImpl>();
builder.Services.AddScoped<FormService, FormServiceImpl>();
builder.Services.AddScoped<VersionService, VersionServiceImpl>();
builder.Services.AddScoped<BrandService, BrandServiceImpl>();
builder.Services.AddScoped<BrandService, BrandServiceImpl>();
builder.Services.AddScoped<ShowroomService, ShowroomServiceImpl>();
builder.Services.AddScoped<WarehouseService, WarehouseServiceImpl>();
builder.Services.AddScoped<CarService, CarServiceImpl>();
builder.Services.AddScoped<ModelService, ModelServiceImpl>();
builder.Services.AddScoped<StatisticService, StatisticServiceImpl>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();


app.UseMiddleware<OutOrderMiddeware>();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("ReactPolicy");
app.UseStaticFiles(new StaticFileOptions
{
    ServeUnknownFileTypes = true,
    DefaultContentType = "application/octet-stream"
});
app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
