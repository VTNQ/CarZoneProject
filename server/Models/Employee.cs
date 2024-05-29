using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Employee")]
public partial class Employee
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string FullName { get; set; } = null!;

    [StringLength(100)]
    [Unicode(false)]
    public string Email { get; set; } = null!;

    [StringLength(200)]
    [Unicode(false)]
    public string Address { get; set; } = null!;

    [StringLength(50)]
    [Unicode(false)]
    public string Phone { get; set; } = null!;

    [StringLength(30)]
    [Unicode(false)]
    public string Role { get; set; } = null!;

    [StringLength(100)]
    [Unicode(false)]
    public string IdentityCode { get; set; } = null!;

    [StringLength(200)]
    [Unicode(false)]
    public string Password { get; set; } = null!;

    public int? IdShowroom { get; set; }

    public int? IdWarehouse { get; set; }

    [InverseProperty("IdEmployeeNavigation")]
    public virtual ICollection<InOrder> InOrders { get; set; } = new List<InOrder>();

    [InverseProperty("IdEmployeeNavigation")]
    public virtual ICollection<OutOrder> OutOrders { get; set; } = new List<OutOrder>();
}
