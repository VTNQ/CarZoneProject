using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("SubWarehouseSupplier")]
public partial class SubWarehouseSupplier
{
    [Key]
    public int Id { get; set; }

    public int IdSupplier { get; set; }

    public int IdCar { get; set; }

    public int Quantity { get; set; }

    [ForeignKey("IdCar")]
    [InverseProperty("SubWarehouseSuppliers")]
    public virtual Car IdCarNavigation { get; set; } = null!;

    [ForeignKey("IdSupplier")]
    [InverseProperty("SubWarehouseSuppliers")]
    public virtual Suplier IdSupplierNavigation { get; set; } = null!;
}
