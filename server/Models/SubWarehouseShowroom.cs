using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("SubWarehouseShowroom")]
public partial class SubWarehouseShowroom
{
    [Key]
    public int Id { get; set; }

    public int IdShowroom { get; set; }

    public int IdCar { get; set; }

    [ForeignKey("IdCar")]
    [InverseProperty("SubWarehouseShowrooms")]
    public virtual Car IdCarNavigation { get; set; } = null!;

    [ForeignKey("IdShowroom")]
    [InverseProperty("SubWarehouseShowrooms")]
    public virtual Showroom IdShowroomNavigation { get; set; } = null!;
}
