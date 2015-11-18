//
//  CDVSms.h
//  JajaReg
//
//  Created by gaozhifei on 15/6/17.
//
//

#import <UIKit/UIKit.h>
#import <Cordova/CDVPlugin.h>
#import <MessageUI/MessageUI.h>
#import <MessageUI/MFMessageComposeViewController.h>

@interface CDVSms : CDVPlugin

@property(strong) NSString* callbackID;

#pragma mark --- 复制字符串
- (void)stringWithCopy:(CDVInvokedUrlCommand *)command;

#pragma mark --- 发送Text消息给联系人
- (void)sendSMS:(CDVInvokedUrlCommand *) command;

#pragma mark --- 发送Text消息给微信
- (void)sendWeChat:(CDVInvokedUrlCommand *)command;

#pragma mark --- 发送Text消息给QQ
- (void)sendQQ:(CDVInvokedUrlCommand *)command;

@end
