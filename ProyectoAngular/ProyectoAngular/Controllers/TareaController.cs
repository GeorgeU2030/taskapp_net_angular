using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;
using ProyectoAngular.Models;

namespace ProyectoAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TareaController : ControllerBase
    {
        private readonly DbangularContext baseDatos;

        public TareaController(DbangularContext baseDatos)
        {
            this.baseDatos = baseDatos;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            var listaTareas = await baseDatos.Tareas.ToListAsync();
            return Ok(listaTareas);
        }

        [HttpPost]
        [Route("Agregar")]
        public async Task<IActionResult> Agregar([FromBody] Tarea request)
        {
            await baseDatos.Tareas.AddAsync(request);
            await baseDatos.SaveChangesAsync();
            return Ok(request);
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var Tareaeliminar = await baseDatos.Tareas.FindAsync(id);

            if (Tareaeliminar == null)
                return BadRequest("no existe la Tarea");
            
            baseDatos.Tareas.Remove(Tareaeliminar);
            await baseDatos.SaveChangesAsync();
            return Ok();
        }

    }
}
