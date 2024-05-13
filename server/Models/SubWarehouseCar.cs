using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("SubWarehouseCar")]
public partial class SubWarehouseCar
{
    [Key]
    public int Id { get; set; }

    public int IdWarehouse { get; set; }

    public int IdCar { get; set; }

    [ForeignKey("IdCar")]
    [InverseProperty("SubWarehouseCars")]
    public virtual Car IdCarNavigation { get; set; } = null!;

    [ForeignKey("IdWarehouse")]
    [InverseProperty("SubWarehouseCars")]
    public virtual Warehouse IdWarehouseNavigation { get; set; } = null!;
}
