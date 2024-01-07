<?php

namespace App\Security;

use Stripe\Exception\AuthenticationException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException as ExceptionAuthenticationException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\AbstractLoginFormAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\CsrfTokenBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Util\TargetPathTrait;


class UserAuthenticator extends AbstractAuthenticator
{
    use TargetPathTrait;

    public const LOGIN_ROUTE = 'app_login';
    public $authenticationUtils;

    public function __construct(AuthenticationUtils $authenticationUtils ,private UrlGeneratorInterface $urlGenerator)
    {
        $this->authenticationUtils = $authenticationUtils;
    }

    public function supports(Request $request): ?bool
    {
        
        return $request->headers->has('X-AUTH-TOKEN');
    }

    public function authenticate(Request $request): Passport
    {
        $apiToken = $request->headers->get('X-AUTH-TOKEN');
        
        if (null == $apiToken) {
            // The token header was empty, authentication fails with HTTP Status
            // Code 401 "Unauthorized"
            throw new CustomUserMessageAuthenticationException('No API token provided',401);
        }

        $content = $request->getContent();
        $informationuser = json_decode($content, true);
        
        $username = $informationuser['username'];
        $password = $informationuser['password'];
       
        return new Passport(
            new UserBadge($username),
            new PasswordCredentials($password)            
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $TokenInterface, string $firewallName): ?Response
    {
       $email = $TokenInterface->getUser()->getEmail();
       $token = $TokenInterface->getUser()->getToken();
       $firstname = $TokenInterface->getUser()->getFirstname();
       $lastename = $TokenInterface->getUser()->getLastname();
       $photoProfil = $TokenInterface->getUser()->getPhotoProfil();
        
        // For example:
        // return new RedirectResponse($this->urlGenerator->generate('some_route'));
        return new JsonResponse([
            'email' => $email,
            'firstname' => $firstname,
            'lastename' => $lastename,
            'photoProfil' => $photoProfil,
            'success' => "success",
            "jwt"=>$token
        ]);
    }
    
    public function onAuthenticationFailure(Request $request, ExceptionAuthenticationException $exception): ?Response
    {
        $data = [
            // you may want to customize or obfuscate the message first
            'message' => strtr($exception->getMessageKey(), $exception->getMessageData())

            // or to translate this message
            // $this->translator->trans($exception->getMessageKey(), $exception->getMessageData())
        ];

        return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
    }
}
