using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Car")]
public partial class Car
{
    [Key]
    public int Id { get; set; }

    [StringLength(300)]
    [Unicode(false)]
    public string Name { get; set; } = null!;

    public int IdModel { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Condition { get; set; } = null!;

    [StringLength(100)]
    [Unicode(false)]
    public string Engine { get; set; } = null!;

    [StringLength(100)]
    [Unicode(false)]
    public string Drivertrain { get; set; } = null!;

    [StringLength(50)]
    [Unicode(false)]
    public string FuelType { get; set; } = null!;

    [StringLength(100)]
    [Unicode(false)]
    public string MotorSize { get; set; } = null!;

    [StringLength(100)]
    [Unicode(false)]
    public string Bhp { get; set; } = null!;

    public int IdColorOutSide { get; set; }

    public int IdColorInSide { get; set; }

    public double Length { get; set; }

    public double Width { get; set; }

    public double Height { get; set; }

    public byte NumberOfSeat { get; set; }

    public double Mileage { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Transmission { get; set; } = null!;

    public int IdVersion { get; set; }

    [Column(TypeName = "money")]
    public decimal Price { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string FuelConsumption { get; set; } = null!;

    public double Weight { get; set; }

    public double SpeedAbility { get; set; }

    public double MaxSpeed { get; set; }

    public bool OffRoad { get; set; }

    public int IdForm { get; set; }

    public DateOnly DateAccept { get; set; }

    public double HeightBetween { get; set; }

    [InverseProperty("IdCarNavigation")]
    public virtual ICollection<DetailOfInOrder> DetailOfInOrders { get; set; } = new List<DetailOfInOrder>();

    [InverseProperty("IdCarNavigation")]
    public virtual ICollection<DetailOfOutOrder> DetailOfOutOrders { get; set; } = new List<DetailOfOutOrder>();

    [ForeignKey("IdColorInSide")]
    [InverseProperty("CarIdColorInSideNavigations")]
    public virtual Color IdColorInSideNavigation { get; set; } = null!;

    [ForeignKey("IdColorOutSide")]
    [InverseProperty("CarIdColorOutSideNavigations")]
    public virtual Color IdColorOutSideNavigation { get; set; } = null!;

    [ForeignKey("IdForm")]
    [InverseProperty("Cars")]
    public virtual Form IdFormNavigation { get; set; } = null!;

    [ForeignKey("IdModel")]
    [InverseProperty("Cars")]
    public virtual Model IdModelNavigation { get; set; } = null!;

    [ForeignKey("IdVersion")]
    [InverseProperty("Cars")]
    public virtual Version IdVersionNavigation { get; set; } = null!;

    [InverseProperty("IdCarNavigation")]
    public virtual ICollection<Photo> Photos { get; set; } = new List<Photo>();

    [InverseProperty("IdCarNavigation")]
    public virtual ICollection<SubWarehouseCar> SubWarehouseCars { get; set; } = new List<SubWarehouseCar>();

    [InverseProperty("IdCarNavigation")]
    public virtual ICollection<SubWarehouseShowroom> SubWarehouseShowrooms { get; set; } = new List<SubWarehouseShowroom>();
}
