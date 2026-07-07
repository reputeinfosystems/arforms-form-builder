<?php

namespace Arforms;

if (\class_exists('Arforms\Google_Client', \false)) {
    // Prevent error with preloading in PHP 7.4
    // @see https://github.com/googleapis/google-api-php-client/issues/1976
    return;
}
$classMap = ['Arforms\Google\Client' => 'Google_Client', 'Arforms\Google\Service' => 'Google_Service', 'Arforms\Google\AccessToken\Revoke' => 'Google_AccessToken_Revoke', 'Arforms\Google\AccessToken\Verify' => 'Google_AccessToken_Verify', 'Arforms\Google\Model' => 'Google_Model', 'Arforms\Google\Utils\UriTemplate' => 'Google_Utils_UriTemplate', 'Arforms\Google\AuthHandler\Guzzle6AuthHandler' => 'Google_AuthHandler_Guzzle6AuthHandler', 'Arforms\Google\AuthHandler\Guzzle7AuthHandler' => 'Google_AuthHandler_Guzzle7AuthHandler', 'Arforms\Google\AuthHandler\AuthHandlerFactory' => 'Google_AuthHandler_AuthHandlerFactory', 'Arforms\Google\Http\Batch' => 'Google_Http_Batch', 'Arforms\Google\Http\MediaFileUpload' => 'Google_Http_MediaFileUpload', 'Arforms\Google\Http\REST' => 'Google_Http_REST', 'Arforms\Google\Task\Retryable' => 'Google_Task_Retryable', 'Arforms\Google\Task\Exception' => 'Google_Task_Exception', 'Arforms\Google\Task\Runner' => 'Google_Task_Runner', 'Arforms\Google\Collection' => 'Google_Collection', 'Arforms\Google\Service\Exception' => 'Google_Service_Exception', 'Arforms\Google\Service\Resource' => 'Google_Service_Resource', 'Arforms\Google\Exception' => 'Google_Exception'];
foreach ($classMap as $class => $alias) {
    \class_alias($class, $alias);
}
/**
 * This class needs to be defined explicitly as scripts must be recognized by
 * the autoloader.
 */
class Google_Task_Composer extends \Arforms\Google\Task\Composer
{
}
/**
 * This class needs to be defined explicitly as scripts must be recognized by
 * the autoloader.
 */
\class_alias('Arforms\Google_Task_Composer', 'Google_Task_Composer', \false);
/** @phpstan-ignore-next-line */
if (\false) {
    class Google_AccessToken_Revoke extends \Arforms\Google\AccessToken\Revoke
    {
    }
    \class_alias('Arforms\Google_AccessToken_Revoke', 'Google_AccessToken_Revoke', \false);
    class Google_AccessToken_Verify extends \Arforms\Google\AccessToken\Verify
    {
    }
    \class_alias('Arforms\Google_AccessToken_Verify', 'Google_AccessToken_Verify', \false);
    class Google_AuthHandler_AuthHandlerFactory extends \Arforms\Google\AuthHandler\AuthHandlerFactory
    {
    }
    \class_alias('Arforms\Google_AuthHandler_AuthHandlerFactory', 'Google_AuthHandler_AuthHandlerFactory', \false);
    class Google_AuthHandler_Guzzle6AuthHandler extends \Arforms\Google\AuthHandler\Guzzle6AuthHandler
    {
    }
    \class_alias('Arforms\Google_AuthHandler_Guzzle6AuthHandler', 'Google_AuthHandler_Guzzle6AuthHandler', \false);
    class Google_AuthHandler_Guzzle7AuthHandler extends \Arforms\Google\AuthHandler\Guzzle7AuthHandler
    {
    }
    \class_alias('Arforms\Google_AuthHandler_Guzzle7AuthHandler', 'Google_AuthHandler_Guzzle7AuthHandler', \false);
    class Google_Client extends \Arforms\Google\Client
    {
    }
    \class_alias('Arforms\Google_Client', 'Google_Client', \false);
    class Google_Collection extends \Arforms\Google\Collection
    {
    }
    \class_alias('Arforms\Google_Collection', 'Google_Collection', \false);
    class Google_Exception extends \Arforms\Google\Exception
    {
    }
    \class_alias('Arforms\Google_Exception', 'Google_Exception', \false);
    class Google_Http_Batch extends \Arforms\Google\Http\Batch
    {
    }
    \class_alias('Arforms\Google_Http_Batch', 'Google_Http_Batch', \false);
    class Google_Http_MediaFileUpload extends \Arforms\Google\Http\MediaFileUpload
    {
    }
    \class_alias('Arforms\Google_Http_MediaFileUpload', 'Google_Http_MediaFileUpload', \false);
    class Google_Http_REST extends \Arforms\Google\Http\REST
    {
    }
    \class_alias('Arforms\Google_Http_REST', 'Google_Http_REST', \false);
    class Google_Model extends \Arforms\Google\Model
    {
    }
    \class_alias('Arforms\Google_Model', 'Google_Model', \false);
    class Google_Service extends \Arforms\Google\Service
    {
    }
    \class_alias('Arforms\Google_Service', 'Google_Service', \false);
    class Google_Service_Exception extends \Arforms\Google\Service\Exception
    {
    }
    \class_alias('Arforms\Google_Service_Exception', 'Google_Service_Exception', \false);
    class Google_Service_Resource extends \Arforms\Google\Service\Resource
    {
    }
    \class_alias('Arforms\Google_Service_Resource', 'Google_Service_Resource', \false);
    class Google_Task_Exception extends \Arforms\Google\Task\Exception
    {
    }
    \class_alias('Arforms\Google_Task_Exception', 'Google_Task_Exception', \false);
    interface Google_Task_Retryable extends \Arforms\Google\Task\Retryable
    {
    }
    \class_alias('Arforms\Google_Task_Retryable', 'Google_Task_Retryable', \false);
    class Google_Task_Runner extends \Arforms\Google\Task\Runner
    {
    }
    \class_alias('Arforms\Google_Task_Runner', 'Google_Task_Runner', \false);
    class Google_Utils_UriTemplate extends \Arforms\Google\Utils\UriTemplate
    {
    }
    \class_alias('Arforms\Google_Utils_UriTemplate', 'Google_Utils_UriTemplate', \false);
}
