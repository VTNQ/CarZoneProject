using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Showroom")]
public partial class Showroom
{
    [Key]
    public int Id { get; set; }

    [StringLength(200)]
    [Unicode(false)]
    public string Name { get; set; } = null!;

    public int IdDistrict { get; set; }

    [ForeignKey("IdDistrict")]
    [InverseProperty("Showrooms")]
    public virtual District IdDistrictNavigation { get; set; } = null!;

    [InverseProperty("IdShowroomNavigation")]
    public virtual ICollection<InOrder> InOrders { get; set; } = new List<InOrder>();

    [InverseProperty("IdShowroomNavigation")]
    public virtual ICollection<OutOrder> OutOrders { get; set; } = new List<OutOrder>();

    [InverseProperty("IdShowroomNavigation")]
    public virtual ICollection<SubWarehouseShowroom> SubWarehouseShowrooms { get; set; } = new List<SubWarehouseShowroom>();
}
