<?php

namespace App\Entity;

use App\Repository\VilleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\UploadedFile;


#[ORM\Entity(repositoryClass: VilleRepository::class)]
class Ville
{
    const SERVER_PATH_TO_IMAGE_FOLDER = 'uploads/';

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $name;

    #[ORM\Column(type: 'string', length: 255)]
    private $photo;

    #[ORM\Column(type: 'datetime')]
    private $createdAt;

    #[ORM\Column(type: 'datetime')]
    private $updatedAt;

    /**
     * Unmapped property to handle file uploads
     */
    private $file;
    
    #[ORM\OneToMany(targetEntity: PopupPubFront::class, mappedBy: 'ville')]
    private $villePublicities;



    public function __construct()
    {
        $this->createdAt=new \DateTime();
        $this->updatedAt=new \DateTime();
        $this->activities = new ArrayCollection();
        $this->subscriptions = new ArrayCollection();
        $this->villePublicities = new ArrayCollection();
    }

    /**
     * Manages the copying of the file to the relevant place on the server
     */
    public function upload(): void
    {
        // the file property can be empty if the field is not required
        if (null === $this->getFile()) {
            return;
        }

        // we use the original file name here but you should
        // sanitize it at least to avoid any security issues
        $id_name = uniqid(md5(true));

        // move takes the target directory and target filename as params

        $this->getFile()->move(
            self::SERVER_PATH_TO_IMAGE_FOLDER,
            $id_name.'.png'
        );// set the path property to the filename where you've saved the file
        $this->setPhoto($id_name.'.png');

        // clean up the file property as you won't need it anymore
        $this->setFile(null);
    }


    /**
     * Lifecycle callback to upload the file to the server.
     */
    public function lifecycleFileUpload(): void
    {

        $this->upload();
    }

    /**
     * Updates the hash value to force the preUpdate and postUpdate events to fire.
     */
    public function refreshUpdated(): void
    {
        $this->setUpdatedAt(new \DateTime());
    }


    public function setFile(?UploadedFile $file = null): void
    {
        $this->file = $file;
    }

    public function getFile(): ?UploadedFile
    {
        return $this->file;
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(string $photo): self
    {
        $this->photo = $photo;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getPublicity(): ?string
    {
        return $this->publicity;
    }


    /**
     * @return Collection<int, PopupPubFront>
     */
    public function getVillePublicities(): Collection
    {
        return $this->villePublicities;
    }

    public function addPopupPubFront(PopupPubFront $PopupPubFront): self
    {
        if (!$this->villePublicities->contains($PopupPubFront)) {
            $this->villePublicities[] = $PopupPubFront;
            $PopupPubFront->setVille($this);
        }

        return $this;
    }

    public function removePopupPubFront(PopupPubFront $PopupPubFront): self
    {
        if ($this->villePublicities->removeElement($PopupPubFront)) {
            // set the owning side to null (unless already changed)
            if ($PopupPubFront->getVille() === $this) {
                $PopupPubFront->setVille(null);
            }
        }

        return $this;
    }

    public function addVillePublicity(PopupPubFront $villePublicity): self
    {
        if (!$this->villePublicities->contains($villePublicity)) {
            $this->villePublicities->add($villePublicity);
            $villePublicity->setVille($this);
        }

        return $this;
    }

    public function removeVillePublicity(PopupPubFront $villePublicity): self
    {
        if ($this->villePublicities->removeElement($villePublicity)) {
            // set the owning side to null (unless already changed)
            if ($villePublicity->getVille() === $this) {
                $villePublicity->setVille(null);
            }
        }

        return $this;
    }

}
