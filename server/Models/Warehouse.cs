using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Warehouse")]
public partial class Warehouse
{
    [Key]
    public int Id { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string Name { get; set; } = null!;

    public int IdCountry { get; set; }

    [ForeignKey("IdCountry")]
    [InverseProperty("Warehouses")]
    public virtual Country IdCountryNavigation { get; set; } = null!;

    [InverseProperty("IdWarehouseNavigation")]
    public virtual ICollection<InOrder> InOrders { get; set; } = new List<InOrder>();

    [InverseProperty("IdWarehouseNavigation")]
    public virtual ICollection<SubWarehouseCar> SubWarehouseCars { get; set; } = new List<SubWarehouseCar>();
}
