<?php

namespace App\Security;

use App\Entity\Adresses;
use App\Entity\User;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Http\Authenticator\AbstractLoginFormAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\CsrfTokenBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Util\TargetPathTrait;
use App\Service\LeaderTruckService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class AdminAuthenticator extends AbstractLoginFormAuthenticator
{
    use TargetPathTrait;

    public const LOGIN_ROUTE = 'admin_login';

    private UrlGeneratorInterface $urlGenerator;

    private $entityManager;
    private $doctrine;
    private $params;

    public function __construct(UrlGeneratorInterface $urlGenerator, ManagerRegistry $doctrine, ParameterBagInterface $params)
    {
        $this->entityManager = $doctrine->getManager();
        $this->doctrine = $doctrine;
        $this->params = $params;
        $this->urlGenerator = $urlGenerator;
    }

    public function authenticate(Request $request): Passport
    {
       
        $email = "";
        
        $user = $this->doctrine->getRepository(User::class)->findOneBy(["username" => $request->request->get('_username')]);
        if ($user and in_array("ROLE_ADMIN", $user->getRoles())) {
            $email = $request->request->get('_username', '');
        }
        

        $request->getSession()->set(Security::LAST_USERNAME, $email);

        return new Passport(
            new UserBadge($email),
            new PasswordCredentials($request->request->get('password', '')),
            [
                new CsrfTokenBadge('authenticate', $request->request->get('_csrf_token')),
            ]
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
       
        $user = $this->doctrine->getRepository(User::class)->findOneBy(["username" => $request->request->get('_username')]);
        //return new RedirectResponse($this->urlGenerator->generate('sonata_admin_dashboard'));
    
        return new RedirectResponse($this->urlGenerator->generate('admin_login'));

    }

    protected function getLoginUrl(Request $request): string
    {

        return $this->urlGenerator->generate(self::LOGIN_ROUTE);
    }
}
