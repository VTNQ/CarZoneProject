using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("InOrder")]
public partial class InOrder
{
    [Key]
    public int Id { get; set; }

    public int IdWarehouse { get; set; }

    public int IdShowroom { get; set; }

    public int IdEmployee { get; set; }

    public DateOnly DateOfSale { get; set; }

    [Column(TypeName = "money")]
    public decimal TotalAmount { get; set; }

    [Column(TypeName = "money")]
    public decimal TotalTax { get; set; }

    public bool Status { get; set; }

    [InverseProperty("IdOrderNavigation")]
    public virtual ICollection<DetailOfInOrder> DetailOfInOrders { get; set; } = new List<DetailOfInOrder>();

    [ForeignKey("IdEmployee")]
    [InverseProperty("InOrders")]
    public virtual Employee IdEmployeeNavigation { get; set; } = null!;

    [ForeignKey("IdShowroom")]
    [InverseProperty("InOrders")]
    public virtual Showroom IdShowroomNavigation { get; set; } = null!;

    [ForeignKey("IdWarehouse")]
    [InverseProperty("InOrders")]
    public virtual Warehouse IdWarehouseNavigation { get; set; } = null!;
}
