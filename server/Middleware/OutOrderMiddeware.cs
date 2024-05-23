using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using server.Services;
using System.Threading.Tasks;

namespace server.Middleware
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class OutOrderMiddeware
    {
        private readonly RequestDelegate _next;

        public OutOrderMiddeware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext,OutOrderService outOrderService)
        {
            await outOrderService.UpdateOrderStatus();
            await _next(httpContext);
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class OutOrderMiddewareExtensions
    {
        public static IApplicationBuilder UseOutOrderMiddeware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<OutOrderMiddeware>();
        }
    }
}
